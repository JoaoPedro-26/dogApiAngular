//informações que eu quero buscar na API

export class Infos { 
    name: string;
    origin: string;
    temperament: string;
    image: Imagem;
    reference_image_id: string;
    life_span: string;
};

export class PostFavorite {
    image_id: string;
    sub_id: string;
};

export class Imagem {
    url: string;
    width: number;
    height: number;
    id: string;
};
