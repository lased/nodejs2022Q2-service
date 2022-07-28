# Home Library Service

## Installing Docker dependencies

Install `docker-scan` scan images for security vulnerabilities.

> For arch linux: `pacman -S docker-scan`

Run command:

```
docker-compose up
```

After starting the app on port (3000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:3000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

Run command for scan images for security vulnerabilities:

```
npm run docker:scan
```

## Migrations

Migration work only at the first start if the **database** is not initialized.

> For drop database run this command: `npm run typeorm -- query "DROP SCHEMA public CASCADE; CREATE SCHEMA public; GRANT USAGE ON SCHEMA public to PUBLIC; GRANT CREATE ON SCHEMA public to PUBLIC; COMMENT ON SCHEMA public IS 'standard public schema';"`

Run command for start migration:

```
npm run migration:run
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

### Available endpoints

#### Users

- `GET /user` - get all users;
- `GET /user/:id` - get user by id;
- `POST /user` - create user, body:
  ```
  {
    login: string;
    password: string
  }
  ```
- `PUT /user/:id` - update user password, body:
  ```
  {
    oldPassword: string;
    newPassword: string;
  }
  ```
- `DELETE /user/:id` - delete user by id.

#### Tracks

- `GET /track` - get all tracks;
- `GET /track/:id` - get track by id;
- `POST /track` - create new track, body:
  ```
  {
    name: string;
    artistId: string | null;
    albumId: string | null;
    duration: number;
  }
  ```
- `PUT /track/:id` - update track info by id;
- `DELETE /track/:id` - delete track by id.

#### Artists

- `GET /artist` - get all artists;
- `GET /artist/:id` - get artist by id;
- `POST /artist` - create new artist, body:
  ```
  {
    name: string;
    grammy: boolean;
  }
  ```
- `PUT /artist/:id` - update artist info by id;
- `DELETE /artist/:id` - delete album by id.

#### Albums

- `GET /album` - get all albums
- `GET /album/:id` - get album by id
- `POST /album` - create new album, body:
  ```
  {
    name: string;
    year: number;
    artistId: string | null;
  }
  ```
- `PUT /album/:id` - update album info by id;
- `DELETE /album/:id` - delete album by id.

#### Favorites

- `GET /favs` - get all favorites;
- `POST /favs/track/:id` - add track to the favorites;
- `DELETE /favs/track/:id` - delete track from favorites;
- `POST /favs/album/:id` - add album to the favorites;
- `DELETE /favs/album/:id` - delete album from favorites;
- `POST /favs/artist/:id` - add artist to the favorites;
- `DELETE /favs/artist/:id` - delete artist from favorites;
