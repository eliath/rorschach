# rorschach

built using Vue 3 + Vite

static site which draws jwz's rorschach screensaver (see
[xscreensaver](https://www.jwz.org/xscreensaver/))

## development

    npm install

### serve local + hot reload

    npm run dev

### linting

    npm run lint

### compile for prod

    npm run build

## deploy

served as a static site from s3 bucket

1. compile
2. upload dist/ folder to s3
