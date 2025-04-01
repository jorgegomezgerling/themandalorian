import { useEffect, useState } from "react";
import { getChapters, reserveChapter } from "../api/chaptersAPI";
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
} from '@mui/material'

export default function ChapterList(){
    const [chapters, setChapters] = useState([])
    const [loading, setLoading] = useState(true)
    const [reservingId, setReservingId] = useState(null);

    const handleReserve = async (chapterId) => {
        setReservingId(chapterId);
        try {

            const userId = 'guest';
            const response = await reserveChapter(chapterId, userId);

            alert(`Reservado! ${response.data.status}. Expira en ${response.data.expires_in} segundos`);
            console.log('Rsadasdasudausdnansnd-----------')

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
            console.log("Estructura completa:" , response.data.chapters[0]);
            setChapters(response.data.chapters)
        })
        .catch(error => {
            console.log('Error:', error)
        })
        .finally(()=> setLoading(false))
    }, [])

    if (loading) return <div>Cargando...</div>

    return (
        <TableContainer component={Paper} sx={{margin:2}}>
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
                        <TableRow key={chapter.title}>
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
                                <Button disabled={chapter.status !== 'available' || reservingId === chapter.id} 
                                        onClick={() => handleReserve(
                                            chapter.id ||
                                            chapter.title.match(/\d+/)?.[0] ||
                                            chapter.title
                                            )}>
                                    {reservingId === chapter.id ? 'Reservando...' : 'Reservar'}
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    );

}