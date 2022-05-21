import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Injectable({
  providedIn: 'root'
})

export class PaginationService {
  private _pageSize = 5;
  private _currentPage = 0;
  private _dataSource: MatTableDataSource<any>;

  public handlePage(e: any, data: Array<any>) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator(data);
  }

  public iterator(data: Array<any>): void {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const dataPart = data.slice(start, end);
    this.dataSource = new MatTableDataSource<any>(dataPart);
  }

  public get currentPage(): number {
    return this._currentPage;
  }

  public set currentPage(page: number) {
    this._currentPage = page;
  }

  public get pageSize(): number {
    return this._pageSize;
  }

  public set pageSize(pageSize: number) {
    this._pageSize = pageSize;
  }

  public get dataSource(): any {
    return this._dataSource;
  }

  public set dataSource(dataSource: any) {
    this._dataSource = dataSource;
  }
}
