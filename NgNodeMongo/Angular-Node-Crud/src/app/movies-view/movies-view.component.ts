import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/services/util.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { FormControl } from '@angular/forms';

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
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  value = '';

  selectedGenre = new FormControl('');

  genreList: string[] = ['Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Drama', 'Documentary', 'Family', 'Fantasy', 'History', 'Horror', 'Music',
  'Musical', 'Mystery', 'Romance', 'Sci-Fi', 'Short', 'Sport', 'Thriller', 'War', 'Western'];

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
      keyCol: true,
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
    public dialog: MatDialog
  ) {
    this.getAllRecords();
  }

  ngOnInit(): void {
    this.displayedColumns = this.columns.map(c => c.columnDef);
  }

  getAllRecords(resetPagination = false) {
    if (resetPagination) {
      this.pageIndex = 0;
      this.pageSize = 25;
    }

    let opts = '?page='+ this.pageIndex +'&size='+ this.pageSize;

    if (this.selectedGenre && this.selectedGenre.value) {
      opts = opts + '&genres=' + this.selectedGenre.value
    }
    if (this.value) {
      opts = opts + '&title=' + this.value;
    }

    this.util.getAll(opts).subscribe((res: any) => {
      console.log(res);
      if (res) {
        this.currentPage = res.currentPage;
        this.length = res.totalItems;
        this.records = res['data'];
        
        this.records.forEach(rec => {
          console.log(rec['genres'])
        });
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

  openDialog(movie: any) {
    this.dialog.open(MovieDetailsComponent, {
      data: movie,
      width: '50vw',
      maxWidth: '80vw',
      minWidth: '380px'
    });
  }

}
