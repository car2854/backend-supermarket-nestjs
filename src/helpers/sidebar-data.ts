export const sidebarData = (type: string) : any => {

  if (type === 'client'){
    return [
      {
        routerLink: 'branch-office',
        name: 'Sucursale'
      },
      {
        routerLink: 'list-products',
        name: 'Productos'
      }
    ]
  }else{
    return [
      {
        routerLink: 'manage/products',
        name: 'Gestion de productos'
      },
      {
        routerLink: 'manage/branch-office',
        name: 'Gestion de sucursales'
      }
    ]
  }

}