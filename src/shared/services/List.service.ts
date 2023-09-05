import { sp } from "@pnp/pnpjs";
import { IGeneralProps } from "./interfaces/iGeneralProps";
import { IReceitas } from "../../webparts/webReceita/interfaces/IReceitas";


export default class ListSP {
    public async getList(idList:string,fields:Array<string>,expand:Array<string>=[''],orderBy:string="ID"):Promise<IGeneralProps> {
        const searchFilter = fields.join(',');
        const searchExpand = expand.join(',');

        const search:IGeneralProps = await sp.web.lists.getById(idList).items.select(searchFilter).expand(searchExpand).orderBy(orderBy).get()
        .then((data:IGeneralProps) => {return data;})
        .catch((err:IGeneralProps) => {return err.message;} )

        return search;

    }

    public async postList(idList:string,fields:IReceitas): Promise<IGeneralProps>{

        const insert:IGeneralProps = await sp.web.lists.getById(idList).items.add(fields).
        then((data:IGeneralProps) => {return data;} ).
        catch((err:IGeneralProps) => {return err;})

        return insert;

    }

}