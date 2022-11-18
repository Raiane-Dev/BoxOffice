interface ReservationProperties
{
    id?: number;
    auditorium_id: string;
    moovie_id: number;
    customer_reserved_id: number;
    reservation_contact: string;
    reserved: boolean;
    active: number;
}

export default ReservationProperties;