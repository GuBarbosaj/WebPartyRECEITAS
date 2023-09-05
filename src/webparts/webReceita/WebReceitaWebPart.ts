import * as React from 'react';
import * as ReactDom from 'react-dom';

import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import Container from './components/Container/Container';
import { IContainerProps } from './components/Container/IContainerProps';

import * as strings from 'WebReceitaWebPartStrings';

import {sp} from "@pnp/sp/presets/all";

export interface IWebReceitaWebPartProps {
  idLista: string;
}

export default class WebReceitaWebPart extends BaseClientSideWebPart<IWebReceitaWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IContainerProps> = React.createElement(
      Container, {
        idLista: this.properties.idLista
      }
    )

    ReactDom.render(element, this.domElement)
  }

  protected onInit(): Promise<void> {
    sp.setup({
      sp:{
        headers: {
          Accept: 'application/json;odata=verbose'
        },
        baseUrl: this.context.pageContext.web.absoluteUrl
      }
    })
    return super.onInit();
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('idLista', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
