import {AppWrapper} from "../components/AppWrapper";
import styled from "styled-components";
import { Button } from 'react-windows-ui';
import {useState} from "react";

export const TextEditor = function({theme}) {
    const [content, setContent] = useState('');
    return(
        <AppWrapper theme={theme}>
            <h2>Editeur de texte</h2>
            <TextEditorArea
                id={'text-editor'}
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <ButtonsContainer>
                <Button
                    justifyContent={'start'}
                    icon={<i className="icons10-save"></i>}
                    value="Sauvegarder"
                    onClick={() => {
                        window.file.save(content);
                        window.notification.show({
                            title: "Sauvegarde",
                            body: "Vous avez bien sauvegardé votre travail !",
                        });
                    }}
                />
                <Button
                    justifyContent={'start'}
                    icon={<i className="icons10-create-new"></i>}
                    value="Charger"
                    onClick={() => window.file.read().then(data => setContent(data))}
                />
            </ButtonsContainer>
        </AppWrapper>
    );
}

const TextEditorArea = styled.textarea`
    width: 94%;
    height: 380px;
`;

const ButtonsContainer = styled.div`
    margin-top: 15px;
    
    button {
        margin-right: 10px;
    }
`;