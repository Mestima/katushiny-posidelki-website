import React, { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';

export default function(props) {
  return (<>
      <Alert variant={props.color} show={props.state}>
        <Alert.Heading>{props.title}</Alert.Heading>
        <p>
          {props.content}
        </p>
        {props.close ? <>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={props.onClose} variant={'outline-'+props.color}>
              {props.close}
            </Button>
          </div>
        </> : <></>
        }
      </Alert>
    </>);
}
