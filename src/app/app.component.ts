import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {
  ConnectorModel,
  DataBinding,
  DataSourceModel,
  Diagram,
  DiagramTools,
  HierarchicalTree,
  NodeModel,
  SnapConstraints,
  SnapSettingsModel,
  LayoutModel
} from '@syncfusion/ej2-angular-diagrams';
import {DataManager} from '@syncfusion/ej2-data';
import * as Data from './diagram-data.json';

export interface DataInfo {
  [key: string]: string;
}

Diagram.Inject(DataBinding, HierarchicalTree);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{

  dataSource: DataSourceModel = {};
  tool: any;
  snapSettings: SnapSettingsModel = {};
  layout: LayoutModel = {};
  constructor() {

  }

  ngOnInit(): void {
    this.dataSource = this.getDataSourceModel();
    this.tool = DiagramTools.ZoomPan;
    this.snapSettings = this.getSnapSettings();
    this.layout = this.getLayoutConfig();
  }

  getDataSourceModel(): DataSourceModel {
    const dataSourceObj: DataSourceModel = {};
    dataSourceObj.id = 'Name';
    dataSourceObj.parentId = 'Category';
    dataSourceObj.dataSource = new DataManager((Data as any).species);
    dataSourceObj.doBinding = (nodeModel: NodeModel, data: DataInfo, diagram: Diagram) => {
      nodeModel.annotations = [{content: data.Name, style: {color: 'black'}}];
      nodeModel.style = {fill: '#ffeec7', strokeColor: '#f5d897', strokeWidth: 1};
    };
    return dataSourceObj;
  }

  getConnectorDefaults(connector: ConnectorModel): void{
    connector.type = 'Orthogonal';
    connector.style = {strokeColor: '#4d4d4d'};
    connector.targetDecorator = {shape: 'None'};
  }

  nodeDefaults(node: NodeModel): NodeModel {
    const nodeObject: NodeModel = {};
    nodeObject.shape = {type: 'Basic', shape: 'Rectangle'};
    nodeObject.style = {strokeWidth: 1};
    nodeObject.width = 95;
    nodeObject.height = 30;
    return nodeObject;
  }

  getSnapSettings(): SnapSettingsModel{
    const snapSettings: SnapSettingsModel = {};
    snapSettings.constraints = SnapConstraints.None;
    return snapSettings;
  }

  getLayoutConfig(): LayoutModel{
    const layoutConfiq: LayoutModel = {};
    layoutConfiq.type = 'HierarchicalTree';
    layoutConfiq.horizontalSpacing = 40;
    layoutConfiq.verticalSpacing = 40;
    layoutConfiq.margin = { top: 10, left: 10, right: 10, bottom: 0 };
    return layoutConfiq;
  }
}

