interface MoovieProperties
{
    id?: number;
    title: string;
    banner: string | number;
    director: string;
    cast: string;
    description: string;
    duration_min: number,
    screening_start: string
}

export default MoovieProperties;