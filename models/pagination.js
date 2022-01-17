class Pagination {
  constructor(totalProducts, currentPage, itemPerPage) {
    let pageNumber = +currentPage;
    this.TotalProducts = totalProducts;
    this.HasNextPage = itemPerPage * pageNumber < this.TotalProducts;
    this.HasPreviousPage = pageNumber > 1;
    this.NextPage = pageNumber + 1;
    this.PreviousPage = pageNumber - 1;
    this.LastPage = Math.ceil(this.TotalProducts / itemPerPage);
    this.CurrentPage = pageNumber;    
  }
}
module.exports = Pagination;
