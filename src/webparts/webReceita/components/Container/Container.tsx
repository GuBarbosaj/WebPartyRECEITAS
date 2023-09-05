import * as React from 'react';
import { IContainerProps } from './IContainerProps';
import { FluentProvider,Tab,TabList,SelectTabEvent,SelectTabData,TabValue, makeStyles} from '@fluentui/react-components';
import { lightTheme } from '../../theme/Theme';

import ViewReceitas from '../View/Receita/Receitas';
import IncludeReceitas from '../include/Receita/Receitas';

const useStyles = makeStyles({

    centralizacao: {

        display: "flex",

        flexDirection: "column",

        flexWrap: "wrap",

        alignContent: "center",

        justifyContent: "center",

        alignItems: "center"

    }

});


const Container: React.FunctionComponent<IContainerProps> = (props) => {

    const styles = useStyles();

    const [selectedTab, setSelectedTab] = React.useState<TabValue>('TabVisualizacao');
    const onTabSelected = (event: SelectTabEvent, data:SelectTabData):void => {
        setSelectedTab(data.value)
    }

    return (
        <FluentProvider theme={lightTheme}>
        <div className={styles.centralizacao}>

                <TabList defaultSelectedValue={selectedTab} onTabSelect={onTabSelected}>
                    <Tab value="TabCadastro">Cadastro de Receitas</Tab>
                    <Tab value="TabVisualizacao">Visualização de Receitas</Tab>
                </TabList>
                <div>
                    {selectedTab === "TabCadastro" && <IncludeReceitas receitaList={props.idLista}/>}
                    {selectedTab === "TabVisualizacao" && <ViewReceitas receitaIdList={props.idLista}/>}
                </div>

        </div>
      </FluentProvider>
    )
}

export default Container