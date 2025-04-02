import { useEffect, useState } from "react";
import { getChapters, rentChapter, reserveChapter } from "../api/chaptersAPI";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Chip,
    Button,
    Dialog, 
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    MenuItem
} from '@mui/material';

export default function ChapterList(){
    const [chapters, setChapters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reservingId, setReservingId] = useState(null);
    const [paymentModal, setPaymentModal] = useState({
        open: false,
        chapterId: null,
        userId: ''
    });

    const PaymentModal = ({ open, onClose, chapterId, userId }) => {
        const [paymentMethod, setPaymentMethod] = useState('credit_card');

        const handleConfirm = async () => {
            try {
              await rentChapter(chapterId, 4.99, userId); // Precio fijo de 4.99
              const updated = await getChapters();
                setChapters(updated.data.chapters);
                onClose();
            } catch (error) {
                alert("Error en pago: " + error.message);
            }
        };

        return (
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Confirmar Pago</DialogTitle>
                <DialogContent>
                    <TextField
                        select
                        label="Método de Pago"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        <MenuItem value="credit_card">Tarjeta de Crédito</MenuItem>
                        <MenuItem value="paypal">PayPal</MenuItem>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancelar</Button>
                    <Button onClick={handleConfirm} variant="contained" color="primary">
                        Pagar $4.99
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };

    const handleReserve = async (chapterId) => {
        setReservingId(chapterId);
        try {
            const userId = 'guest'; // O implementa autenticación real
            await reserveChapter(chapterId, userId);
            
            // Abre el modal de pago después de reservar
            setPaymentModal({ 
                open: true, 
                chapterId, 
                userId 
            });

            const updatedResponse = await getChapters();
            setChapters(updatedResponse.data.chapters);
        } catch (error) {
            console.error('Error en reserva: ', error);
            alert(`Error: ${error.response?.data?.error || 'No se pudo reservar'}`);
        } finally {
            setReservingId(null);
        }
    };

    useEffect(() => {
        getChapters()
        .then(response => {
            setChapters(response.data.chapters);
        })
        .catch(error => {
            console.log('Error:', error);
        })
        .finally(() => setLoading(false));
    }, []);

    if (loading) return <CircularProgress sx={{ margin: 4 }} />;

    return (
        <>
            <TableContainer component={Paper} sx={{ margin: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Título</TableCell>
                            <TableCell>Temporada</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {chapters.map((chapter) => (
                            <TableRow key={`${chapter.title}-${chapter.season}`}>
                                <TableCell>{chapter.title}</TableCell>
                                <TableCell>{chapter.season}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={chapter.status}
                                        color={
                                            chapter.status === 'available' ? 'success' :
                                            chapter.status === 'reserved' ? 'warning' : 'error'
                                        }          
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button 
                                        disabled={chapter.status !== 'available' || reservingId === chapter.id}
                                        onClick={() => handleReserve(
                                            chapter.id ||
                                            chapter.title.match(/\d+/)?.[0] ||
                                            chapter.title
                                        )}
                                        variant="contained"
                                        color="primary"
                                    >
                                        {reservingId === chapter.id ? 'Reservando...' : 'Reservar'}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Modal de Pago */}
            <PaymentModal
                open={paymentModal.open}
                chapterId={paymentModal.chapterId}
                userId={paymentModal.userId}
                onClose={() => setPaymentModal({...paymentModal, open: false})}
            />
        </>
    );
}

