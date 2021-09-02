import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function wikiCard(props) {
    return (
        <div className="wikiCard">
            <Card className="text-center" bg="info">
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                        <Card.Text>
                            {props.content}
                        </Card.Text>
                    <Button variant="primary" href={props.link} target="_blank">Check out the wiki article!</Button>
                </Card.Body>
            </Card>
        </div>
    );
}

export default wikiCard;