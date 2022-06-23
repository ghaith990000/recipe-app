import React, {  useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import {Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import {Link} from 'react-router-dom'
// const data = {recipes: [
//     {
//         id: 1, 
//         title: "Hummus",
//         image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/08/chana-masala-recipe-500x500.jpg",
//      },
//     {
//         id: 2,
//         title: "Cucumber Sandwich" ,
//         image: "https://static.onecms.io/wp-content/uploads/sites/44/2022/03/01/cucumber-sandwich.jpg", 
//     },
//     {
//         id: 3,
//         title: "Pasta" ,
//         image: "https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Puttanesca-fd5810c.jpg", 
//     },
//     {
//         id: 4,
//         title: "Charred Cabbage Skillet Gratin" ,
//         image: "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2FPhoto%2FRecipes%2F2022-01-cabbage-gratin%2Fk-photo-2022-01-cabbage-gratin-01-017559-WEB"
//     },
//     {
//         id: 5,
//         title: "Cucumber Sandwich" ,
//         image: "https://static.onecms.io/wp-content/uploads/sites/44/2022/03/01/cucumber-sandwich.jpg", 
//     },
    
// ]};

function Popular() {
    const [popular, setPopular] = useState([]);

    const getPopular = useCallback(async (ignore) => {
        const check = localStorage.getItem('popular');

        if(check){
            setPopular(JSON.parse(check))
        }else {
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`)
            const data = await api.json();

            localStorage.setItem('popular', JSON.stringify(data.recipes));
            setPopular(data.recipes);
            console.log(popular);
        }
    });
    
    useEffect(() => {
        getPopular();
        // setPopular(popular);
    }, [getPopular]);

    

    
    
    return ( 
        <Wrapper>
            <h3>Popular Picks</h3>

            <Splide options={{
                perPage: 4,
                arrows: false,
                pagination: false,
                drag: 'free',
                gap: '5rem',
            }}>
            {popular.map((recipe)=>{
                return(
                    <SplideSlide key={recipe.id}>
                        <Card>
                            <Link to={'/recipe/' + recipe.id}>
                                <p>{recipe.title}</p>
                                <img src={recipe.image} alt={recipe.title} />
                                <Gradient />
                            </Link>
                        </Card>
                    </SplideSlide>
                );
            })}
            </Splide>
        </Wrapper>
    );

}

const Wrapper = styled.div`
    margin: 4rem 0rem;
`

const Card = styled.div`
    min-height: 25rem;
    border-radius: 2rem;
    overflow: hidden;
    position: relative;
    
    img {
        border-radius: 2rem;
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;

    }

    p{
        position: absolute;
        z-index: 10;
        left: 50%;
        bottom: 0%;
        transform: translate(-50%, 0%);
        color: white;
        width: 100%;
        text-align: center;
        font-weight: 600;
        height: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`

const Gradient = styled.div`
    z-index: 3;
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0,0,0,0), rgba(0, 0, 0, 0.5));
`

export default Popular;
