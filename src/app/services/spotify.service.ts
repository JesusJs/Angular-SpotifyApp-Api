import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http: HttpClient ) {
    console.log('Spotify Service Listo!!');
   }

   getQuery( query: string ){

    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
        'Authorization': 'Bearer BQAxx9847Y72fysWazZXxK4Uk1XkkRc0Z16W6dqd-4a_jNN4N3ritDmO1dvhRlHUBHwlFv51-3Ergu0XjTI'
    });

    return this.http.get(url, { headers });
   }


   getNewReleases() {

    return this.getQuery('browse/new-releases?offset=0&limit=20')
              .pipe( map( data => {
                return data['albums'].items;
            }));
   }

    // tslint:disable-next-line: typedef
    getArtistas( termino: string ){

    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
              .pipe( map( data => {
                return data['artists'].items;
            }));

   }

   getArtista( id: string ){

    return this.getQuery(`artists/${id}`)
   // .pipe( map( data => return data['id'].items));
   }

   getTopTracks( id: string ){

    return this.getQuery(`artists/${id}/top-tracks?market=us`)
                  .pipe( map( data => data['tracks'] ));
   }


  }
