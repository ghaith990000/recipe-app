import React, {useEffect, useState, useCallback} from 'react'
import styled from 'styled-components'
import {useParams} from 'react-router-dom';
import {device} from '../utilities/device';
// const details = {
//     id: 1, 
//     title: "Hummus",
//     image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/08/chana-masala-recipe-500x500.jpg",
// };

function Recipe() {
    const [details, setDetails] = useState({}); 
    const [activeTab, setActiveTab] = useState('instructions');
    let params = useParams();
    const fetchDetails = useCallback(async () => {
        const data = await fetch(`https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
        const detailData = await data.json();
        console.log(detailData);
        setDetails(detailData);
    }, []);

    useEffect(() => {
        fetchDetails();
    }, [params.id, fetchDetails]);
  return (
    <DetailWrapper>
        <HeaderWrapper>
            <h2>{details.title}</h2>
            <Image src={details.image} alt="" />
        </HeaderWrapper>
        <Info>
            <ButtonWrapper>
                <Button className={activeTab === 'instructions' ? 'active' : ''} onClick={() => setActiveTab('instructions')}>Instructions</Button>
                <Button className={activeTab === 'ingredients' ? 'active' : ''} onClick={() => setActiveTab('ingredients')}>Ingredients</Button>
            </ButtonWrapper>
            {activeTab === 'instructions' && (
             <div>
                <h3 dangerouslySetInnerHTML={{__html: details.summary}}></h3>
                <h3 dangerouslySetInnerHTML={{__html: details.instructions}}></h3>
            </div>) 
            }
            {activeTab === 'ingredients' && (
                <ul>
                    {details.extendedIngredients.map((ingredient) => <li key={ingredient.id}>{ingredient.original}</li>
                    )}
                </ul>
            )} 
            
        </Info>
    </DetailWrapper>
  )
}

const DetailWrapper = styled.div`
    margin-top: 1rem;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    max-width: 100%;
    margin-right: auto;
    margin-left: auto;

   @media ${device.laptop}{
    flex-direction: row;
    gap: 3rem;
   }



    .active {
        background: linear-gradient(35deg, #494949, #313131); 
        color: white;
    }

    h2 {
        margin-bottom: 3rem;
    }

    li {
        font-size: 1.2rem;
        line-height: 2.5rem;
    }

    ul {
        margin-top: 2rem;
    }
`;



const HeaderWrapper = styled.div`
    text-align: center;
    width: 100%;
    margin-bottom: 30px;

    @media ${device.laptop}{
        text-align: left;
    }
`;



const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

  @media ${device.laptop}{
    height: 70vh;
  }
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;

    @media ${device.laptop}{
        /* width: 50%; */
    }
`;

const Button = styled.button`
    padding: 1.5rem 3rem;
    color: #313131;
    background: white;
    border: 2px solid black;
    font-weight: 600;
    font-size: 2rem;
    width: 100%;

    @media ${device.laptop}{
        font-size: 1.2rem;
    }
`

const Info = styled.div`
    /* margin-left: 2rem; */
    width: 100%;

    @media ${device.laptop}{
        width: 50%;
    }
`



export default Recipe