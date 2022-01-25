# 1.0.0 (2022-01-25)


### Bug Fixes

* **`get-timeblock`:** update messy live time conditions ([8baa5d5](https://github.com/keinsell/timo/commit/8baa5d5e12167ec5899492ae7684f840a0b2f475))
* **`get-users`:** return objects instead strings ([1a51bb7](https://github.com/keinsell/timo/commit/1a51bb709072aaec39fdfbe96b3b99c084574c23))
* **`post-timetracking`:** database was looking for every `isTracking` instead one related to user ([6ea87e4](https://github.com/keinsell/timo/commit/6ea87e496b786017f60f70a41ad4de80dd7017ec))
* **`timeblock`:** add interface to mongodb model ([2174e01](https://github.com/keinsell/timo/commit/2174e01a78e3e114cf60bbb41618253109cfa70c))
* **`users`:** remove duplicated response ([c67982a](https://github.com/keinsell/timo/commit/c67982ab6fa59234e0fccd3269ee88c9af2e84e5))


### Build System

* **`tsc`:** swap `tsc` with `esbuild` ([62e753f](https://github.com/keinsell/timo/commit/62e753f51cbc1ae076abcd755c4a584356b208f5))


### Features

* **`core`:** add morgan ([653e9f2](https://github.com/keinsell/timo/commit/653e9f2e4a070b6917af24ba17045cae54670db4))
* **`delete-timeblock`:** add method to `TimetrackingService` ([b908698](https://github.com/keinsell/timo/commit/b908698dc3e2a6d3fa449de4fa47207419f199b1))
* **`delete-timeblock`:** add method to `TimetrackingService` ([523d6dd](https://github.com/keinsell/timo/commit/523d6ddd281f8295b5b19dd1f01be96edfab8e22))
* **`get-timeblock`:** add `duration` field to response ([9aa5701](https://github.com/keinsell/timo/commit/9aa5701bb42a9b3936485ea3ce5446583beb8d02))
* **`get-timeblock`:** add method to `TimetrackingService` ([f2dced5](https://github.com/keinsell/timo/commit/f2dced57503b199ca5cca15603b78db23b4a76db))
* **`patch-timeblock`:** add method to `TimetrackingService` ([425b382](https://github.com/keinsell/timo/commit/425b382475aa64bd849a5038e119d758a724ece4))
* **`patch-timeblock`:** add method to `TimetrackingService` ([8b756f1](https://github.com/keinsell/timo/commit/8b756f1278bdee3c0966635adfd60a4542fd9f47))
* **`post-timeblock`:** add handler for starting timeblock ([128e0c7](https://github.com/keinsell/timo/commit/128e0c78ebb57d37133359fac598748a1e63eb40))
* **`timeblocks`:** integrate `PATCH` and `DELETE` method to router ([85ecf92](https://github.com/keinsell/timo/commit/85ecf9255178abb67e83f9680a7e19ac3149ea1c))
* **`users`:** add `POST`, `GET`, `DEL` methods to `UserService` ([#20](https://github.com/keinsell/timo/issues/20)) ([435b3a2](https://github.com/keinsell/timo/commit/435b3a29465dbc0ff93f243b350d0dfe1cd159a7))


### BREAKING CHANGES

* **`tsc`:** application is now using different build system which may cause crashes.

# [1.0.0-main.8](https://github.com/keinsell/timo/compare/v1.0.0-main.7...v1.0.0-main.8) (2022-01-25)

# [1.0.0-main.7](https://github.com/keinsell/timo/compare/v1.0.0-main.6...v1.0.0-main.7) (2022-01-25)


### Features

* **`core`:** add morgan ([653e9f2](https://github.com/keinsell/timo/commit/653e9f2e4a070b6917af24ba17045cae54670db4))

# [1.0.0-main.6](https://github.com/keinsell/timo/compare/v1.0.0-main.5...v1.0.0-main.6) (2022-01-25)

# [1.0.0-main.5](https://github.com/keinsell/timo/compare/v1.0.0-main.4...v1.0.0-main.5) (2022-01-25)


### Bug Fixes

* **`post-timetracking`:** database was looking for every `isTracking` instead one related to user ([6ea87e4](https://github.com/keinsell/timo/commit/6ea87e496b786017f60f70a41ad4de80dd7017ec))

# [1.0.0-main.4](https://github.com/keinsell/timo/compare/v1.0.0-main.3...v1.0.0-main.4) (2022-01-25)


### Bug Fixes

* **`get-timeblock`:** update messy live time conditions ([8baa5d5](https://github.com/keinsell/timo/commit/8baa5d5e12167ec5899492ae7684f840a0b2f475))

# [1.0.0-main.3](https://github.com/keinsell/timo/compare/v1.0.0-main.2...v1.0.0-main.3) (2022-01-25)


### Features

* **`get-timeblock`:** add `duration` field to response ([9aa5701](https://github.com/keinsell/timo/commit/9aa5701bb42a9b3936485ea3ce5446583beb8d02))

# [1.0.0-main.2](https://github.com/keinsell/timo/compare/v1.0.0-main.1...v1.0.0-main.2) (2022-01-24)


### Features

* **`delete-timeblock`:** add method to `TimetrackingService` ([b908698](https://github.com/keinsell/timo/commit/b908698dc3e2a6d3fa449de4fa47207419f199b1))
* **`patch-timeblock`:** add method to `TimetrackingService` ([425b382](https://github.com/keinsell/timo/commit/425b382475aa64bd849a5038e119d758a724ece4))
* **`timeblocks`:** integrate `PATCH` and `DELETE` method to router ([85ecf92](https://github.com/keinsell/timo/commit/85ecf9255178abb67e83f9680a7e19ac3149ea1c))

# 1.0.0-main.1 (2022-01-24)


### Bug Fixes

* **`get-users`:** return objects instead strings ([1a51bb7](https://github.com/keinsell/timo/commit/1a51bb709072aaec39fdfbe96b3b99c084574c23))
* **`timeblock`:** add interface to mongodb model ([2174e01](https://github.com/keinsell/timo/commit/2174e01a78e3e114cf60bbb41618253109cfa70c))
* **`users`:** remove duplicated response ([c67982a](https://github.com/keinsell/timo/commit/c67982ab6fa59234e0fccd3269ee88c9af2e84e5))


### Build System

* **`tsc`:** swap `tsc` with `esbuild` ([62e753f](https://github.com/keinsell/timo/commit/62e753f51cbc1ae076abcd755c4a584356b208f5))


### Features

* **`delete-timeblock`:** add method to `TimetrackingService` ([523d6dd](https://github.com/keinsell/timo/commit/523d6ddd281f8295b5b19dd1f01be96edfab8e22))
* **`get-timeblock`:** add method to `TimetrackingService` ([f2dced5](https://github.com/keinsell/timo/commit/f2dced57503b199ca5cca15603b78db23b4a76db))
* **`patch-timeblock`:** add method to `TimetrackingService` ([8b756f1](https://github.com/keinsell/timo/commit/8b756f1278bdee3c0966635adfd60a4542fd9f47))
* **`post-timeblock`:** add handler for starting timeblock ([128e0c7](https://github.com/keinsell/timo/commit/128e0c78ebb57d37133359fac598748a1e63eb40))
* **`users`:** add `POST`, `GET`, `DEL` methods to `UserService` ([#20](https://github.com/keinsell/timo/issues/20)) ([435b3a2](https://github.com/keinsell/timo/commit/435b3a29465dbc0ff93f243b350d0dfe1cd159a7))


### BREAKING CHANGES

* **`tsc`:** application is now using different build system which may cause crashes.
