# WARNING: This file is generated and it's not meant to be edited.
# Before making any changes, please read Bazel documentation.
# https://docs.bazel.build/versions/master/be/workspace.html
# The WORKSPACE file tells Bazel that this directory is a "workspace", which is like a project root.
# The content of this file specifies all the external dependencies Bazel needs to perform a build.

####################################
# ESModule imports (and TypeScript imports) can be absolute starting with the workspace name.
# The name of the workspace should match the npm package where we publish, so that these
# imports also make sense when referencing the published package.
workspace(name = "xlayers")

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

RULES_NODEJS_VERSION = "0.16.5"
http_archive(
    name = "build_bazel_rules_nodejs",
    url = "https://github.com/bazelbuild/rules_nodejs/archive/%s.zip" % RULES_NODEJS_VERSION,
    strip_prefix = "rules_nodejs-%s" % RULES_NODEJS_VERSION,
)

RULES_TYPESCRIPT_VERSION = "0.22.0"
http_archive(
    name = "build_bazel_rules_typescript",
    url = "https://github.com/bazelbuild/rules_typescript/archive/%s.zip" % RULES_TYPESCRIPT_VERSION,
    strip_prefix = "rules_typescript-%s" % RULES_TYPESCRIPT_VERSION,
)

# The @angular repo contains rule for building Angular applications
ANGULAR_VERSION = "7.1.3"
http_archive(
    name = "angular",
    url = "https://github.com/angular/angular/archive/%s.zip" % ANGULAR_VERSION,
    strip_prefix = "angular-%s" % ANGULAR_VERSION,
)

# RxJS
RXJS_VERSION = "6.3.3"
http_archive(
    name = "rxjs",
    url = "https://registry.yarnpkg.com/rxjs/-/rxjs-%s.tgz" % RXJS_VERSION,
    strip_prefix = "package/src",
)

# Rules for compiling sass
RULES_SASS_VERSION = "1.15.1"
http_archive(
    name = "io_bazel_rules_sass",
    url = "https://github.com/bazelbuild/rules_sass/archive/%s.zip" % RULES_SASS_VERSION,
    strip_prefix = "rules_sass-%s" % RULES_SASS_VERSION,
)

# Angular material
# NOTE: using a `7.1.1-compat-ng-7.1.3` branch of material2 on a fork here
# since Angular and rules_typescript version under Bazel checking is too strict
# at the moment.
# https://github.com/gregmagolan/material2/commit/e2090864cddf926445eefd39c7e90eada107013d
# TODO(gregmagolan): update the next release of material that is compatible with
#   Angular 7.1.3 under Bazel
http_archive(
    name = "angular_material",
    sha256 = "75bec457885ddf084219a9da152ff79831d84909bb036552141ca3aadee64a04",
    strip_prefix = "material2-7.1.1-compat-ng-7.1.3",
    url = "https://github.com/gregmagolan/material2/archive/7.1.1-compat-ng-7.1.3.zip",
)

####################################
# Load and install our dependencies downloaded above.

load("@angular//packages/bazel:package.bzl", "rules_angular_dependencies")
rules_angular_dependencies()

load("@build_bazel_rules_typescript//:package.bzl", "rules_typescript_dependencies")
rules_typescript_dependencies()

load("@build_bazel_rules_nodejs//:package.bzl", "rules_nodejs_dependencies")
rules_nodejs_dependencies()

load("@build_bazel_rules_nodejs//:defs.bzl", "check_bazel_version", "node_repositories", "yarn_install")
check_bazel_version("0.19.0")
node_repositories()
yarn_install(
    name = "npm",
    package_json = "//:package.json",
    yarn_lock = "//:yarn.lock",
)

load("@io_bazel_rules_go//go:def.bzl", "go_register_toolchains", "go_rules_dependencies")
go_rules_dependencies()
go_register_toolchains()

load("@io_bazel_rules_webtesting//web:repositories.bzl", "browser_repositories", "web_test_repositories")
web_test_repositories()
browser_repositories(
    chromium = True,
    firefox = True,
)

load("@build_bazel_rules_typescript//:defs.bzl", "ts_setup_workspace")
ts_setup_workspace()

load("@io_bazel_rules_sass//sass:sass_repositories.bzl", "sass_repositories")
sass_repositories()

load("@angular//:index.bzl", "ng_setup_workspace")
ng_setup_workspace()

load("@angular_material//:index.bzl", "angular_material_setup_workspace")
angular_material_setup_workspace()
