import { supabase } from '@/lib/supabase';
import { useCallback, useEffect, useState } from 'react';
import EmblaCarousel from './embla/EmblaCarousel';
import './embla/css/embla.css';
import type { VinosOrganizados, Wines } from './interface';
import { GlobalSelectionProvider, useGlobalSelection } from '@/hooks/useGlobalSelection'

function CardsMainReact() {
	const [vinosOrganizados, setVinosOrganizados] = useState<VinosOrganizados>({});

	const { getSelectedItems } = useGlobalSelection();
	const selectedVarieties = getSelectedItems('selectedItems_variedades');

	const fetchData = useCallback(async () => {
		try {
			let query = supabase
				.from("vinos")
				.select(`
          id, 
          nombre, 
          precio,
          variedad, 
          id_unica, 
          url_imagen, 
          bodega,
          variedades(id, variedad, tipo), 
          paises(id, pais)
        `);

			const { data: vinos, error: errorVinos } = await query;
			if (errorVinos) {
				throw new Error(errorVinos.message);
			}


			const vinosOrganizados = organizarVinosPorVariedad(vinos as unknown as Wines[]);
			setVinosOrganizados(vinosOrganizados);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	}, []);

	const organizarVinosPorVariedad = (vinos: Wines[]): VinosOrganizados => {
		const vinosOrganizados = vinos.reduce((acc: VinosOrganizados, vino: Wines) => {
			const nombreVariedad = vino.variedades.variedad;
			if (!acc[nombreVariedad]) acc[nombreVariedad] = [];
			acc[nombreVariedad].push(vino);
			return acc;
		}, {} as VinosOrganizados);

		return Object.keys(vinosOrganizados)
			.sort((a, b) => a.localeCompare(b))
			.reduce((acc: VinosOrganizados, key: string) => {
				acc[key] = vinosOrganizados[key];
				return acc;
			}, {} as VinosOrganizados);
	};

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const vinosFiltrados = Object.keys(vinosOrganizados).reduce((acc: VinosOrganizados, key: string) => {
		if (selectedVarieties.length === 0 || selectedVarieties.includes(key)) {
			acc[key] = vinosOrganizados[key];
		}
		return acc;
	}, {});

	return (
		<main className="pt-3 pb-1 bg-normalColor11 rounded-r-xl">
			{Object.keys(vinosFiltrados).map((variedad) => (
				<EmblaCarousel
					key={variedad}
					titulo={variedad.toString()}
					options={{
						align: 'start',
						loop: false,
					}}
					vinos={vinosFiltrados[variedad]}
				/>
			))}
		</main>
	);
}

export default function Cards() {
	return (
		<GlobalSelectionProvider>
			<CardsMainReact />
		</GlobalSelectionProvider>
	);
}
