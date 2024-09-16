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
import useCart from '@/hooks/useCart'
import { Edit, Save, ShoppingCart } from "lucide-react"
import { useEffect, useState } from 'react'

export default function ModalCarrito() {
  const [open, setOpen] = useState(false)
  const { cart, removeFromCart, updateCartItem } = useCart()
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editQuantity, setEditQuantity] = useState<number>(0)
  const [localCart, setLocalCart] = useState(cart)

  useEffect(() => {
    setLocalCart(cart)
  }, [cart])

  const handleRemove = (productId: number) => {
    removeFromCart(productId)
    setLocalCart(prevCart => prevCart.filter(item => item.productId !== productId))
  }

  const handleEdit = (productId: number, quantity: number) => {
    setEditingId(productId)
    setEditQuantity(quantity)
  }

  const handleSave = (productId: number) => {
    updateCartItem(productId, editQuantity)
    setEditingId(null)
    setLocalCart(prevCart => prevCart.map(item =>
      item.productId === productId ? { ...item, quantity: editQuantity } : item
    ))
  }

  const totalPrice = localCart.reduce((total, item) => total + item.price * item.quantity, 0)
  console.log(typeof window !== 'undefined' && window.localStorage.getItem('cart')?.length)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className='bg-normalColor11 text-white border-none hover:invert-0'>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Carrito (
          {typeof window !== 'undefined' && window.localStorage.getItem('cart')?.length}
          )
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[70%]">
        <DialogTitle className="flex items-center">
          <ShoppingCart className="mr-2 h-5 w-5" />
          Carrito de Compras
        </DialogTitle>
        <div className="max-h-[60vh] overflow-auto">
          {localCart.length === 0 ? (
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
                  {localCart.map((item) => (
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
            )
          }
        </div>
        <div className="mt-4 text-right">
          <strong>Total: ${totalPrice.toFixed(2)}</strong>
        </div>
      </DialogContent>
    </Dialog>
  )
}