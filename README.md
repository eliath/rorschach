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

needs fixing, maybe? didn't look into the interaction btwn current syntax and whatever eslint is
being used.

### compile for prod

    npm run build

## deploy

served as a static site from s3 bucket

```bash
# compile
npm run build

# navigate to dist folder
cd dist

# sync to s3 bucket
aws --profile eliath.biz s3 sync . s3://eliath.biz --delete
```

might also be a good idea to create a cloudfront invalidation to force-refresh the live site
distribution.
