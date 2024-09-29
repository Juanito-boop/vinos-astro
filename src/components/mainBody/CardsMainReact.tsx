import { GlobalSelectionProvider, useGlobalSelection } from '@/hooks/useGlobalSelection';
import { supabase } from '@/lib/supabase';
import { useCallback, useEffect, useState } from 'react';
import EmblaCarousel from './embla/EmblaCarousel';
import './embla/css/embla.css';
import type { VinosOrganizados, Wines } from './interface';

function CardsMainReact() {
	const [vinosOrganizados, setVinosOrganizados] = useState<VinosOrganizados>({});
	const [showNoResults, setShowNoResults] = useState(false);
	const { getSelectedItems } = useGlobalSelection();

	const selectedVarieties = getSelectedItems('selectedItems_variedades');
	const selectedCountries = getSelectedItems('selectedItems_paises');

	// Función para organizar los vinos por variedades
	const organizarVinosPorVariedad = (vinos: Wines[]): Wines[] => {
		return vinos.sort((a, b) => {
			const firstVarietyA = a.variedades[0];
			const firstVarietyB = b.variedades[0];
			return firstVarietyA.localeCompare(firstVarietyB);
		});
	};

	// Función para organizar los vinos basados en las selecciones de variedades y países
	const organizarVinos = useCallback((vinos: Wines[], selectedVarieties: string[], selectedCountries: string[]): VinosOrganizados => {
		return vinos.reduce((acc: VinosOrganizados, vino: Wines) => {
			const matchesVariety = selectedVarieties.length === 0 || vino.variedades.some(variedad => selectedVarieties.includes(variedad));
			const matchesCountry = selectedCountries.length === 0 || selectedCountries.includes(vino.pais_importacion);

			// Si no hay selecciones, organizar por país de forma predeterminada
			if (selectedVarieties.length === 0 && selectedCountries.length === 0) {
				const country = vino.pais_importacion;
				acc[country] = acc[country] || [];
				acc[country].push(vino);
			}

			// Organizar según selecciones
			if (matchesVariety && matchesCountry) {
				if (selectedCountries.length > 0 && selectedVarieties.length === 0) {
					const country = vino.pais_importacion;
					acc[country] = acc[country] || [];
					acc[country].push(vino);
				} else if (selectedCountries.length === 0 && selectedVarieties.length > 0) {
					vino.variedades.forEach((variedad) => {
						if (selectedVarieties.includes(variedad)) {
							acc[variedad] = acc[variedad] || [];
							acc[variedad].push(vino);
						}
					});
				} else if (selectedCountries.length > 0 && selectedVarieties.length > 0) {
					const key = `${vino.pais_importacion} - ${vino.variedades.join(", ")}`;
					acc[key] = acc[key] || [];
					acc[key].push(vino);
				}
			}

			return acc;
		}, {} as VinosOrganizados);
	}, []);

	// Función para obtener los datos de vinos desde supabase y organizar con base en las selecciones
	const fetchData = useCallback(async () => {
		try {
			const { data: vinos, error: errorVinos } = await supabase.from("wines").select(`*`);

			if (errorVinos) {
				throw new Error(errorVinos.message);
			}

			// Organizar los vinos con base en las selecciones
			const vinosOrganizados = organizarVinos(
				vinos as Wines[],
				selectedVarieties,
				selectedCountries
			);

			// Si no hay selecciones o solo hay países seleccionados, organizar por variedad dentro de cada país
			if ((selectedCountries.length > 0 && selectedVarieties.length === 0) ||
				(selectedCountries.length === 0 && selectedVarieties.length === 0)) {
				Object.keys(vinosOrganizados).forEach((country) => {
					vinosOrganizados[country] = organizarVinosPorVariedad(vinosOrganizados[country]);
				});
			}

			setVinosOrganizados(vinosOrganizados);

			// Actualizar estado para manejar el caso de "sin resultados"
			setShowNoResults(Object.keys(vinosOrganizados).length === 0);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	}, [selectedVarieties, selectedCountries, organizarVinos]);

	// Escuchar cambios en selectedVarieties y selectedCountries
	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return (
		<main className="main-cards px-3">
			{Object.keys(vinosOrganizados).map((key) => (
				<EmblaCarousel
					key={key}
					titulo={key}
					options={{
						align: 'start',
						loop: false,
					}}
					vinos={vinosOrganizados[key] as Wines[]}
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
