import * as React from "react";
import { ITableProps } from "./ITableProps";

import {
    DataGridBody,
    DataGridRow,
    DataGrid,
    DataGridHeader,
    DataGridHeaderCell,
    DataGridCell,
    TableCellLayout,
    TableColumnDefinition,
    createTableColumn,
    DataGridProps,
  } from "@fluentui/react-components";
import { IReceitas } from "../../../../../interfaces/IReceitas";


const Table:React.FunctionComponent<ITableProps> = (props) => {

    const columns: TableColumnDefinition<IReceitas>[] = [
        createTableColumn<IReceitas>({
          columnId: "Receita",
          compare: (a, b) => {
            return a.Receita.localeCompare(b.Receita);
          },
          renderHeaderCell: () => {
            return "Receita";
          },
          renderCell: (item) => {
            return (
              <TableCellLayout>
                {item.Receita}
              </TableCellLayout>
            );
          },
        }),
        createTableColumn<IReceitas>({
            columnId: "TipoReceita",
            compare: (a, b) => {
              return a.TipoReceita.localeCompare(b.TipoReceita);
            },
            renderHeaderCell: () => {
              return "Tipo Receita";
            },
            renderCell: (item) => {
              return (
                <TableCellLayout>
                  {item.TipoReceita}
                </TableCellLayout>
              );
            },
          }),
          createTableColumn<IReceitas>({
            columnId: "Cara",
            compare: (a, b) => {
              return transformaBoolParaString(a.Cara).localeCompare(transformaBoolParaString(b.Cara));
            },
            renderHeaderCell: () => {
              return "A receita é cara?";
            },
            renderCell: (item) => {
              return (
                <TableCellLayout>
                  {transformaBoolParaString(item.Cara)}
                </TableCellLayout>
              );
            },
          }),
          createTableColumn<IReceitas>({
            columnId: "DataTentativa",
            compare: (a, b) => {
              return transformaStringParaDataCompare(a.DataTentativa).localeCompare(transformaStringParaDataCompare(b.DataTentativa));
            },
            renderHeaderCell: () => {
              return "Data da Tentativa";
            },
            renderCell: (item) => {
              return (
                <TableCellLayout>
                  {transformaStringParaData(item.DataTentativa)}
                </TableCellLayout>
              );
            },
          }),
      ];


      function transformaBoolParaString(bool:boolean):string {
        if(bool){
            return "true";
        }
        return "false";
      }

      function transformaStringParaData(date:any):string {
        try{
          if(date != null){
              const dateObj = new Date(date)
              const dia: number = dateObj.getDate();
              const mes: number = dateObj.getMonth() + 1;
              const ano: number = dateObj.getFullYear();
          
              const diaFormatado: string = dia < 10 ? `0${dia}` : `${dia}`;
              const mesFormatado: string = mes < 10 ? `0${mes}` : `${mes}`;
          
              return `${diaFormatado}/${mesFormatado}/${ano}`;
          }
          return "";
        }catch{
          return "";
        }
      }

      function transformaStringParaDataCompare(date:any):string {

        try{
          const dateObj = new Date(date)
          const mes: number = dateObj.getMonth() + 1; // Mês começa em 0, então adicionamos 1
          const dia: number = dateObj.getDate();
      
          const anoFormatado: string = dateObj.getFullYear().toString();
          const mesFormatado: string = mes < 10 ? `0${mes}` : `${mes}`;
          const diaFormatado: string = dia < 10 ? `0${dia}` : `${dia}`;
      
          return `${anoFormatado}${mesFormatado}${diaFormatado}`;
        } catch {
          return ""
        }
        
      }

    const [sortState, setSortState] = React.useState<
      Parameters<NonNullable<DataGridProps["onSortChange"]>>[1]
    >({
      sortColumn: "file",
      sortDirection: "ascending",
    });
    const onSortChange: DataGridProps["onSortChange"] = (e, nextSortState) => {
      setSortState(nextSortState);
    };
  
    return (
      <DataGrid
        items={props.item}
        columns={columns}
        sortable
        sortState={sortState}
        onSortChange={onSortChange}
      >
        <DataGridHeader>
          <DataGridRow>
            {({ renderHeaderCell }) => (
              <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
            )}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody<IReceitas>>
          {({ item, rowId }) => (
            <DataGridRow<IReceitas> key={rowId}>
              {({ renderCell }) => (
                <DataGridCell>{renderCell(item)}</DataGridCell>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
    );
  };

export default Table