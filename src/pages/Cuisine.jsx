import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import {motion} from 'framer-motion'
import {Link, useParams} from 'react-router-dom';

function Cuisine() {
    const [cuisines, setCuisines] = useState([]);
    let params = useParams();
    const getCuisine = async (name) => {

        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}&number=9`);
        console.log(data);
        const recipes = await data.json();
        console.log(recipes.results);
        setCuisines(recipes.results);
    };

    useEffect(() => {
        getCuisine(params.type);
        console.log(params.type);
    }, [params.type])
  
    return (
        <Grid
            animate={{opacity: 1}}
            initial={{opacity: 0}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}
        >
        {cuisines.map((cuisine)=>{
            return (
                <Card key={cuisine.id}>
                    <Link to={"/recipe/" + cuisine.id}>
                        <img src={cuisine.image} alt="" />
                        <h4>{cuisine.title}</h4>
                    </Link>
                </Card>
            )
        })}
        </Grid>
    );
}

const Grid = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap: 3rem;
`;

const Card = styled.div`
    img {
        width: 100%;
        border: 2rem;

    }

    a {
        text-decoration: none;
    }

    h4 {
        text-align: center;
        padding: 1rem;
    }
`
export default Cuisine