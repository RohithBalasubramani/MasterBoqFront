import React from 'react'
import styled from 'styled-components'

const ValueButton= styled.button`
        display: inline-block;
    border: 1px solid #ddd;
    margin: 0px;
    width: 40px;
    height: 40px;
    text-align: center;
    vertical-align: middle;
    padding: 11px 0;
    background: #eee;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    &:hover {
        cursor: pointer;


    }


`

const Decrease= styled.button`
    margin-right: -4px;
    border-radius: 8px 0 0 8px;
`
const Increase= styled.button`
    margin-left: -4px;
    border-radius: 0 8px 8px 0;
`
const Inp= styled.input`
    text-align: center;
    border: none;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    margin: 0px;
    width: 40px;
    height: 40px;
    ::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
  }
`


const ButtonInc = () => {
  return (
    <div>
        <ValueButton><Decrease/></ValueButton>
        <Inp value="0"></Inp>
        <ValueButton><Increase/></ValueButton>        

      
    </div>
  )
}

export default ButtonInc
