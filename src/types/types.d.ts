export interface Users {
    id: number,
    name: string,
    password: string,
    email: string,
    cash:[
        nameCash: string,
        price: number,
    ]
}

interface ActiveWindow {
    active: boolean;
    setActive:(active: boolean) => void;
}

interface DataProps {
    priceAdd: (cost: number, category:string) => void;
    categories: string[]
  }

interface DataPropsAndActiveWindow extends ActiveWindow, DataProps {}
