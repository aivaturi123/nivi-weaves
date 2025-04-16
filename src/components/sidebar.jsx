import React from 'react'
import { useState } from 'react';

import { preview } from 'vite';
export const Sidebar = ({filters, setFilters}) => {

    

    
    const handleMake = (e) => {
        if(e.target.checked){

            setFilters(prevFilters => ({
                ...prevFilters, all: false,make: [...prevFilters.make, e.target.value]
    
            }));
        }
        else {
            setFilters(prevFilters => ({
                ...prevFilters,
               all: false,
                make: prevFilters.make.filter(item => item !== e.target.value) 
              }));
        }
        


    }
    const handleColor = (e) => {

        if(e.target.checked){
            setFilters(prevFilters => ({
                ...prevFilters, all: false,color: [...prevFilters.color, e.target.value]

            }));
        
        }
        else{
            setFilters(prevFilters => ({
                ...prevFilters,
               all: false,
                color: prevFilters.color.filter(item => item !== e.target.value) 
              }));

        }
    }


    
    const handleAll = (e) => {

        setFilters(prevFilters => ({
            ...prevFilters, all: true,make: [...prevFilters.color, e.target.value]

        }));


    }
    

    return (
        <div className='filter'>
            <div className='all'>
                <input type = "checkbox" className= 'all' value='all' onChange={handleAll}/>
            </div>
            <div className='make'>
                <p> Make</p>
                <input type = "checkbox" className='tussar' value ='tussar' onChange={handleMake}/>
                <input type = "checkbox" className='banarasi' value='banarasi' onChange={handleMake}/>
                <input type = "checkbox" className='mysore' value='mysore' onChange={handleMake}/>
                <input type = "checkbox" className='mangalgiri' value='mangalgiri' onChange={handleMake}/>
                <input type = "checkbox" className='kanjivaram' value='kanjivaram' onChange={handleMake}/>
                <input type = "checkbox" className='handwoven' value='handwoven' onChange={handleMake}/>
                <input type = "checkbox" className='handloom' value='handloom' onChange={handleMake}/>
                <input type = "checkbox" className='borderless' value='borderless' onChange={handleMake}/>
                <input type = "checkbox" className='natural dyes' value='natural dyes' onChange={handleMake}/>
                <input type = "checkbox" className='katan' value='katan' onChange={handleMake}/>
            </div>  
            <div className='color'>
                <p> Color </p>
                <input type = "checkbox" className='wine' value = 'wine' onChange={handleColor}/>
                <input type = "checkbox" className='yellow' value = 'yellow' onChange={handleColor}/>
                <input type = "checkbox" className='purple' value = 'purple' onChange={handleColor}/>
                <input type = "checkbox" className='blue' value = 'blue' onChange={handleColor}/>
                <input type = "checkbox" className='red' value = 'red' onChange={handleColor}/>
                <input type = "checkbox" className='green' value = 'green' onChange={handleColor}/>
                <input type = "checkbox" className='pink' value = 'pink' onChange={handleColor}/>
                <input type = "checkbox" className='silver' value = 'silver' onChange={handleColor}/>
                <input type = "checkbox" className='brown' value = 'brown' onChange={handleColor}/>
            </div>  
            
        </div>
        
    );

}