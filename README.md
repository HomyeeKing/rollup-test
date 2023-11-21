# Step

```bash
npm i

npm run build
```

check the `dist/lunchtime.js` contain `require('@uni/env')`(the sub dependency)

# Note

- change the external with your self-test dependency and must be sub denepdency(or third? I haven't test this case)

- make sure `lunchtime` should always require from vendor chunk

- or if you remove import vendor.js statement in `lunchtime.js`, it won't require `@uni/env`
