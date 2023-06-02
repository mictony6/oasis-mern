import {Button, Container, Form} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {useState} from "react";

export default function ChangeLanguage(){

    const [language,setLanguage] = useState("en");
    const {t, i18n} = useTranslation();
    function switchLanguage(val) {
        setLanguage(val)
        i18n.changeLanguage(val)
    }
    return(
        <>
            <Form.Label>
                Change Language
            </Form.Label>
            <Form.Control as="select" value={language} onChange={(e) => {switchLanguage(e.target.value)}} >
                <option value={"en"}>English</option>
                <option value={"fil"}>Filipino</option>
            </Form.Control>
        </>
    );
}