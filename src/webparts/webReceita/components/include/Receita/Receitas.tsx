import * as React from "react";
import { IReceitasProps } from "./iReceitasProps";
import { Combobox, ComboboxProps, Option, Field, Input, InputProps, makeResetStyles, tokens, Switch, makeStyles, typographyStyles, Button } from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { Save24Regular} from "@fluentui/react-icons";
import { stringIsNullOrEmpty } from "@pnp/pnpjs";
import ListSP from "../../../../../shared/services/List.service";
import { IReceitas } from '../../../interfaces/IReceitas';

const useStackClassName = makeResetStyles({

    display: "flex",

    flexWrap: "wrap",

    gap: tokens.spacingHorizontalS,

    padding: tokens.spacingHorizontalS

});

const useStyles = makeStyles({

    description: {

      ...typographyStyles.caption1,

    }

});

const IncludeReceitas: React.FunctionComponent<IReceitasProps> = (props) => {

    const spList = new ListSP();

    const styles = useStyles();

    const [nomeReceita, setNomeReceita] = React.useState('');

    const [selectedTipoReceita, setSelectedTipoReceita] = React.useState<string[]>([
      ]);

      const onSelectTipoReceita: ComboboxProps["onOptionSelect"] = (ev, data) => {
        setSelectedTipoReceita(data.selectedOptions);
        console.log(selectedTipoReceita);
      };

    const onChangeNomeReceita: InputProps["onChange"] = (ev, data) => {
        setNomeReceita(data.value);
      };

    const [caraReceita, setCaraReceita] = React.useState(false);
    const onChangeCaraReceita = React.useCallback(
    (ev: { currentTarget: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
        setCaraReceita(ev.currentTarget.checked);
    },
    [setCaraReceita]
    );

    const [dataReceita, setDataReceita] = React.useState<Date>(new Date());

    async function salvarReceita():Promise<void> {
        if(verificaCamposObrigatorios()){
            const receita:IReceitas = {
                Receita: nomeReceita,
                TipoReceita: selectedTipoReceita[0]? selectedTipoReceita[0]: "",
                Cara: caraReceita,
                DataTentativa: dataReceita
            };

            await spList.postList(props.receitaList,receita)
            .then((result) => {
                console.log('R: ', result);
            })
            .catch((result) => {
                console.log('E: ', result)
            })
        }
        
    }

    function verificaCamposObrigatorios():boolean {
        if(!stringIsNullOrEmpty(nomeReceita)){
            alert("Campo nome da receita não está preenchido!")
            return false
        }
        return true
    }

    return (
        <React.Fragment>
            <div className={useStackClassName()}>
                <Field label="Required field" required>
                    <Input style={{minWidth:100}} onChange={onChangeNomeReceita} value={nomeReceita}/>
                </Field>  
                <Field label="Tipo de receita">
                    <Combobox onOptionSelect={onSelectTipoReceita} freeform ={false}>
                        <Option text="Bebidas" value="Bebidas">Bebidas</Option>
                        <Option text="Comidas" value="Comidas">Comidas</Option>
                        <Option text="Sobremessas" value="Sobremessas">Sobremessas</Option>
                    </Combobox>
                </Field>
                </div>
                <div className={useStackClassName()}>
                    <Field label="Receita Cara?">
                        <Switch
                            checked={caraReceita}
                            onChange={onChangeCaraReceita}
                            label={caraReceita ? "Sim" : "Não"}
                            />
                        <span className={styles.description}>
                        {caraReceita ? "Se for cara não compre":"Só compre ate dia 05"}
                        </span>
                    </Field>
                    
                </div>
                <div className={useStackClassName()}>
                    <Field label="Data:">
                    <DatePicker
                        allowTextInput={true}
                        value={dataReceita}
                        onSelectDate={(data:Date) => {setDataReceita(data)}}
                        placeholder="Selecione uma data..."
                        />
                    </Field>

                </div>
                <div className={useStackClassName()}>
                    <Field label="Imagem da receita">
                        <input type="file" id="inputFile" />
                    </Field>
                </div>
                <div className={useStackClassName()}>
                    <Button icon={<Save24Regular/>} onSelect={salvarReceita()}> Salvar Registro

                    </Button>
                </div>
        </React.Fragment>
    )

}

export default IncludeReceitas