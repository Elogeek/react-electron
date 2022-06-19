import {AppWrapper} from "../components/AppWrapper";
import styled from "styled-components";
import { Button } from 'react-windows-ui';
import {useEffect, useState} from "react";

export const TextEditor = function({theme}) {
    const [dataKey, setDataKey] = useState(0);
    const [content, setContent] = useState('');

    useEffect( () => {
        window.storage.get('data_key').then(data => setDataKey(data));
    }, []);

    return(
        <AppWrapper theme={theme}>
            <h2>Editeur de texte</h2>
            <span>La valeur du paramètre est : {dataKey}</span>
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
                    value="Sauvegarder en BDD"
                    onClick={() => window.database.createText(content)}
                />

                {/* Mise à jour de la valeur du paramètre stocké data-key depuis le script de préchargement vers le main process */}
                <Button
                    justifyContent={'start'}
                    value="Set le paramètre de data-key"
                    onClick={() => {
                        window.storage.set('data_key', 'error here, bad type');
                        window.storage.get('data_key').then(data => setDataKey(data));
                    }}
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