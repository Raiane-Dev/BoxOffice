interface MonopolyProperties
{
    id?: number;

    title: string;
    banner?: string | number;
    director: string;
    cast: string;
    description: string;
    duration_min: number

    moovie_id: number;
    auditorium_id: number;
    screening_start: string;

    name: string,
    seats_no: number;
}

export default MonopolyProperties;
