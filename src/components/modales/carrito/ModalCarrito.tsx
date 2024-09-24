import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { CartItem } from "@/hooks/interface"
import { Edit, Save, ShoppingCart } from "lucide-react"
import { useCallback, useEffect, useState } from 'react'

export default function ModalCarrito() {
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editQuantity, setEditQuantity] = useState<number>(0)
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localStorageCart = JSON.parse(localStorage.getItem('cart') || '[]')
      setCart(localStorageCart)
    }
  }, [])

  const removeFromCart = useCallback((productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.productId !== productId));
  }, []);

  const updateCartItem = useCallback((productId: number, quantity: number) => {
    setCart(prevCart => prevCart.map(item =>
      item.productId === productId ? { ...item, quantity } : item
    ));
  }, []);

  const handleRemove = (productId: number) => {
    removeFromCart(productId)
  }

  const handleEdit = (productId: number, quantity: number) => {
    setEditingId(productId)
    setEditQuantity(quantity)
  }

  const handleSave = (productId: number) => {
    updateCartItem(productId, editQuantity)
    setEditingId(null)
  }

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className='bg-normalColor11 text-white border-none hover:invert-0'>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Carrito (
          {cart.length === 0 ? 0 : cart.length}
          )
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[70%]">
        <DialogTitle className="flex items-center">
          <ShoppingCart className="mr-2 h-5 w-5" />
          Carrito de Compras
        </DialogTitle>
        <div className="max-h-[60vh] overflow-auto">
          {cart.length === 0 ? (
            <p>El carrito está vacío</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Producto</TableHead>
                  <TableHead>Cantidad</TableHead>
                  <TableHead className="text-right">Precio</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.map((item) => (
                  <TableRow key={item.productId}>
                    <TableCell>{item.nombre}</TableCell>
                    <TableCell>
                      {editingId === item.productId ? (
                        <input
                          type="number"
                          min="1"
                          value={editQuantity}
                          onChange={(e) => setEditQuantity(parseInt(e.target.value))}
                          className="w-16 p-1 border rounded"
                        />
                      ) : (
                        item.quantity
                      )}
                    </TableCell>
                    <TableCell className="text-right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                    <TableCell>
                      {editingId === item.productId ? (
                        <Button onClick={() => handleSave(item.productId)} variant="outline" size="sm">
                          <Save className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button onClick={() => handleEdit(item.productId, item.quantity)} variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      <Button onClick={() => handleRemove(item.productId)} variant="destructive" size="sm" className="ml-2">
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
        <div className="mt-4 text-right">
          <strong>Total: ${totalPrice.toFixed(2)}</strong>
        </div>
      </DialogContent>
    </Dialog>
  )
}