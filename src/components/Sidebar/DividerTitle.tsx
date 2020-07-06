import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'react-bootstrap'

const Title = styled.h4`
  color: #fff;
  font-size: 18px;
  margin: 0;
`

const Button = styled.button`
  background-color: #007bff;
  border: none;
  border-radius: 100%;
  width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  color: #fff;
  padding: 0;
`

type DividerProps = {
  title: string;
  onBtnClick: any;
}

function DividerTitle ({ title, onBtnClick } : DividerProps) {
  return (
    <Row>
      <Col>
        <Title>{title}</Title>
      </Col>
      <Col xs="auto">
        <Button onClick={onBtnClick}>+</Button>
      </Col>
    </Row>
  )
}

export default DividerTitle