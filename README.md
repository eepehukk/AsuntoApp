# Angular Tutorial & Little own twist.
- Tutorial source
  Project is based on tutorial and it is from Angulars official youtube chanel "Angular" and link to this series is.  
  
  `https://www.youtube.com/watch?v=xAT0lHYhHMY&list=PL1w1q3fL4pmj9k1FrJ3Pe91EPub2_h4jF`

- Own twist
  Added a manage houses functionality. Named in Finnish to be clear what is mine and what is from tutorial.
  - Currently editing houses works.
  - Adding a new house notice works
  - Created delete house notice.

  - TLDR;
    - My own code can be found from manage-housing.component & housing.service.ts.
    - If you see Finnish that's written by me

- Notes:
  I haven't been focusing on css or overall usability because I felt learning in this project typescript and Angular was more important than css.

# Angular Homes App
- Install Angular if you don't have it installed

  `npm install -g @angular/cli`

- Clone this branch to your local machine

  `git clone -b homes-app-start git@github.com:angular/codelabs.git homes-app`

- Once the code has been downloaded

  `cd homes-app`

- Install the depencies

  `npm install` 

- Run the application 

  `ng serve`

- Download & Run json-server

  `npm install -g json-server`

  `json-server --watch db.json`
