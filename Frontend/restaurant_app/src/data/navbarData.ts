
interface NavBarPlaceHolder{
       id : number
       text : string

}

export const publicNavBar : NavBarPlaceHolder[]  = [
    { id: 1, text: 'Home' },
    { id: 2, text: 'Menu' },
    { id: 3, text: 'About Us'},
]

export const userNavBar : NavBarPlaceHolder[] = [
    { id: 1, text: 'Home' },
    { id: 4, text: 'Past Orders'},
    { id: 5, text: 'Ongoing Orders'},
    { id: 2, text: 'Menu' },
    { id: 3, text: 'About Us'},
]


export const driverNavBar : NavBarPlaceHolder[] = [
    { id: 1, text: 'Home' },
    { id: 4, text: 'Past Deliveries'},
    { id: 5, text: 'Current Job'},
    { id: 6, text: 'Available Jobs'},
    { id: 3, text: 'About Us'},
]