export class SearchObjectBase {
  constructor() {
    this.pageStartIndex = 0;

    this.pageSize = 200;

    this.searchPattern = null;

    this.sortDescending = false;

    this.useLoadMore = false;

    this.restartLoadMore = false;
  }
}
