import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/services/util.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-movies-view',
  templateUrl: './movies-view.component.html',
  styleUrls: ['./movies-view.component.scss']
})
export class MoviesViewComponent implements OnInit {

  length = 10;
  pageSize = 25;
  pageIndex = 0;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  records = [];
  pageEvent: PageEvent = {
    length: 0,
    pageSize: 0,
    pageIndex: 0,
  };

  cardView = true;
  displayedColumns: any[] = [];
  columns = [
    {
      columnDef: 'title',
      header: 'Title',
      type: 'string',
      width: 180,
      cell: (element: any) => `${element.title}`,
    },
    {
      columnDef: 'year',
      header: 'Reelase Year',
      type: 'date',
      width: 80,
      cell: (element: any) => `${element.year}`,
    },
    {
      columnDef: 'runtime',
      header: 'Runtime',
      type: 'number',
      width: 80,
      cell: (element: any) => `${element.runtime}`,
    },
    {
      columnDef: 'genres',
      header: 'Genres',
      type: 'array',
      width: 150,
      cell: (element: any) => `${element.genres}`,
    },
    {
      columnDef: 'directors',
      header: 'Director/s',
      type: 'array',
      width: 150,
      cell: (element: any) => `${element.directors}`,
    },
    {
      columnDef: 'languages',
      header: 'Languages',
      type: 'array',
      width: 150,
      cell: (element: any) => `${element.languages}`,
    },
    {
      columnDef: 'rated',
      header: 'Ratings',
      type: 'array',
      width: 150,
      cell: (element: any) => element.rated ? `${element.rated}` : '-',
    },
    {
      columnDef: 'imdb',
      header: 'IMDB Rating',
      type: 'number',
      width: 100,
      cell: (element: any) => element.imdb && element.imdb.rating && element.imdb.votes ? `${element.imdb?.rating} (${element.imdb?.votes})` : '-',
    },
    {
      columnDef: 'tomatoes',
      header: 'Rotten Tomato Viewer',
      type: 'number',
      width: 100,
      cell: (element: any) => element.tomatoes && element.tomatoes.viewer ? `${element.tomatoes?.viewer?.rating} (${element.tomatoes?.viewer?.numReviews})` : '-',
    },
    {
      columnDef: 'awards',
      header: 'Awards Won (Nominations)',
      type: 'number',
      width: 100,
      cell: (element: any) => `${element.awards?.wins} (${element.awards?.nominations})`,
    },

  ];
  // ['title', 'year', 'runtime', 'genres'];

  constructor(
    private util: UtilService,
  ) {
    this.getAllRecords();
  }

  ngOnInit(): void {
    this.displayedColumns = this.columns.map(c => c.columnDef);
  }

  getAllRecords() {
    this.util.getAll('?page='+ this.pageIndex +'&size='+ this.pageSize).subscribe((res: any) => {
      console.log(res);
      if (res) {
        this.currentPage = res.currentPage;
        this.length = res.totalItems;
        this.records = res['data'];
      }
    });
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  paginate(event: any) {
    this.pageEvent = event;
    this.pageIndex = this.pageEvent.pageIndex;
    this.pageSize = this.pageEvent.pageSize;
    this.getAllRecords();
  }

}
