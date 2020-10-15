import React, {useState, useEffect} from "react";
import {Form, Input, Button, Modal, Header} from "semantic-ui-react";
import '../css/GameForm.css';

export const GameFormEdit = ({gameContext}) => {

    const[game, setGame] = useState(gameContext);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect (() => {
      setGame(gameContext)
    }, [gameContext])

    const handleChange = event => {
      const { name, value} = event.target
      setGame({...game, [name]: value})
    }

    console.log("GAME CONTEXT title: " + gameContext.title + " id: " + gameContext.id)
    return (
      <Modal
        trigger={<Button circular onClick={() => setModalOpen(true)}>*</Button>}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <Modal.Content>
          <Modal.Description>
            <Header>Modify current game details.</Header>
          </Modal.Description>
          <Form>
            <Form.Field>
              <Input
                name="title"
                value={game.title}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Input
                name="consoleId"
                value={game.consoleId}
                disabled
              />
            </Form.Field>
            <Form.Field>
              <Button onClick={async () => {
                const response = await fetch('/update_game', {
                  method: 'POST',
                  headers: {
                    'Content-Type':'application/json'
                  },
                  body: JSON.stringify(game)
                })
                
                if (response.ok) {
                  console.log('response from /update_game!');
                  setModalOpen(false);
                }
              }}
              >
                Update
              </Button>
              <Button onClick={() => {
                  setModalOpen(false);
                }
              }
              >
                Cancel
              </Button>
            </Form.Field>
          </Form>
        </Modal.Content>
      </Modal>
    );
}
