// import { resolve } from 'core-js/fn/promise'; //creo que esto no hacía falta
import { createRouter, createWebHashHistory } from 'vue-router'; 
import isAuthenticatedGuard from './auth-guard';


// import AboutPage from "../modules/pokemon/pages/AboutPage";
// import ListPage from "../modules/pokemon/pages/ListPage";
// import PokemonPage from "../modules/pokemon/pages/PokemonPage";

// import NoPageFound from '../modules/shared/pages/NoPageFound'

const routes = [
    // {
    //     path: '/',
    //     redirect:'/home'
    // },
    {
        path: '/pokemon',
        name: 'pokemon',
        component: () => import(/* webpackChunkName: "PokemonLayout" */ '@/modules/pokemon/layouts/PokemonLayout'),
        children:[
            { 
                path: 'home', 
                name: 'pokemon-home',
                // component: ListPage 
                component: () => import(/* webpackChunkName: "ListPage" */ '../modules/pokemon/pages/ListPage')
            },
            { 
                path: 'about', 
                name: 'pokemon-about',
                // component: AboutPage },
                component: () => import(/* webpackChunkName: "AboutPage" */ '../modules/pokemon/pages/AboutPage') 
            },
            { 
                path: 'pokemonid/:id', 
                // component: PokemonPage 
                name: 'pokemon-id',
                component: () => import(/* webpackChunkName: "PokemonPage" */ '../modules/pokemon/pages/PokemonPage'),
                props: ( route ) => {
                    const id = Number(route.params.id)
                    return isNaN( id ) ? { id : 1 } : { id: id }
                }
            },
            {
                path: '',
                name:'redirect-pokemon',
                redirect: { name: 'pokemon-about' }
            },
        ]
    },

    //DBZ Layout
    {
        path: '/dbz',
        name: 'dbz',
        beforeEnter: [ isAuthenticatedGuard ],
        component: () => import(/* webpackChunkName: "DragonBallLayout" */ '@/modules/dbz/layouts/DragonBallLayout'),
        children:[
            { 
                path: 'characters', 
                name: 'dbz-characters',
                // beforeEnter: [ isAuthenticatedGuard ], Si se lo pones a cada ruta te hace la validación con cada una.

                // component: ListPage 
                component: () => import(/* webpackChunkName: "DbzCharacters" */ '../modules/dbz/pages/Characters')
            },
            { 
                path: 'about', 
                name: 'dbz-about',
                // component: AboutPage },
                component: () => import(/* webpackChunkName: "DbzAboutPage" */ '../modules/dbz/pages/About') 
            },
            {
                path: '',
                name:'redirect-dbz',
                redirect: { name: 'dbz-characters' }
            },
            
        ]
    },


    // { 
    //     path: '/home', 
    //     name: 'home',
    //     // component: ListPage 
    //     component: () => import(/* webpackChunkName: "ListPage" */ '../modules/pokemon/pages/ListPage')
    // },
    // { 
    //     path: '/about', 
    //     name: 'about',
    //     // component: AboutPage },
    //     component: () => import(/* webpackChunkName: "AboutPage" */ '../modules/pokemon/pages/AboutPage') 
    // },
    // { 
    //     path: '/pokemonid/:id', 
    //     // component: PokemonPage 
    //     name: 'pokemon-id',
    //     component: () => import(/* webpackChunkName: "PokemonPage" */ '../modules/pokemon/pages/PokemonPage'),
    //     props: ( route ) => {
    //         const id = Number(route.params.id)
    //         return isNaN( id ) ? { id : 1 } : { id: id }
    //     }
    // },
    { 
        path: '/:pathMatch(.*)*', 
        // component: NoPageFound 
        component: () => import(/* webpackChunkName: "NoPageFound" */ '../modules/shared/pages/NoPageFound') 
    
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes, 
})


// Guard Global - Síncrono

// router.beforeEach( ( to, from, next ) =>{
//     console.log({ to, from, next })

//     const random = Math.random() * 100

//     if( random > 50 ) {
//         console.log('Autenticado')
//         next()
//     }else{
//         console.log(random, 'bloqueado por el beforeEach Guard')
//         next({ name: 'pokemon-home' })
//     }

//     // next()
// })


// Guard Global - Asíncrono

// const canAccess = () => {
//     return new Promise( resolve => {

//         const random = Math.random()* 100
//         if( random > 50 ) {
//             console.log('autenticado-canAccess')
//             // next()
//             resolve(true)
//         } else {
//             console.log(random, 'bloqueado por el beforeEach Guard-canAccess')
//             // next({ name: 'pokemon-home' })
//             resolve(false)
//         }

//     })

// }

// router.beforeEach( async ( to, from, next ) => {
    
//     const authorized = await canAccess()

//     authorized
//         ? next()
//         : next({ name: 'pokemon-home' })

// })



export default router
