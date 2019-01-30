# The WORKSPACE file tells Bazel that this directory is a "workspace", which is like a project root.
# The content of this file specifies all the external dependencies Bazel needs to perform a build.

####################################
# ESModule imports (and TypeScript imports) can be absolute starting with the workspace name.
# The name of the workspace should match the npm package where we publish, so that these
# imports also make sense when referencing the published package.
workspace(name = "xlayers")

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

# The Bazel buildtools repo contains tools like the BUILD file formatter, buildifier
BAZEL_BUILDTOOLS_VERSION = "49a6c199e3fbf5d94534b2771868677d3f9c6de9"

http_archive(
    name = "com_github_bazelbuild_buildtools",
    url = "https://github.com/bazelbuild/buildtools/archive/%s.zip" % BAZEL_BUILDTOOLS_VERSION,
    strip_prefix = "buildtools-%s" % BAZEL_BUILDTOOLS_VERSION,
    sha256 = "edf39af5fc257521e4af4c40829fffe8fba6d0ebff9f4dd69a6f8f1223ae047b",
)

# The @angular repo contains rule for building Angular applications
http_archive(
    name = "angular",
    url = "https://github.com/angular/angular/archive/7.1.0.zip",
    strip_prefix = "angular-7.1.0",
)

# The @rxjs repo contains targets for building rxjs with bazel
http_archive(
    name = "rxjs",
    url = "https://registry.yarnpkg.com/rxjs/-/rxjs-6.3.3.tgz",
    strip_prefix = "package/src",
    sha256 = "72b0b4e517f43358f554c125e40e39f67688cd2738a8998b4a266981ed32f403",
)

# Angular material
http_archive(
    name = "angular_material",
    url = "https://github.com/angular/material2/archive/7.1.0.zip",
    strip_prefix = "material2-7.1.0",
)

# Rules for compiling sass
http_archive(
    name = "io_bazel_rules_sass",
    url = "https://github.com/bazelbuild/rules_sass/archive/1.15.1.zip",
    strip_prefix = "rules_sass-1.15.1",
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

# The minimum bazel version to use with this example repo
# Bazel 0.19 supports the .bazelignore file
check_bazel_version("0.19.0")

node_repositories(
    node_version = "10.9.0",
    yarn_version = "1.12.1",
)

yarn_install(
    name = "npm",
    package_json = "//:package.json",
    yarn_lock = "//:yarn.lock",
    data = ["//:postinstall.tsconfig.json"],
)

load("@io_bazel_rules_go//go:def.bzl", "go_rules_dependencies", "go_register_toolchains")

go_rules_dependencies()
go_register_toolchains()

load("@io_bazel_rules_webtesting//web:repositories.bzl", "browser_repositories", "web_test_repositories")

web_test_repositories()
browser_repositories(
    chromium = True,
    firefox = True,
)

load("@build_bazel_rules_typescript//:defs.bzl", "ts_setup_workspace", "check_rules_typescript_version")

ts_setup_workspace()

load("@io_bazel_rules_sass//:defs.bzl", "sass_repositories")

sass_repositories()

load("@angular//:index.bzl", "ng_setup_workspace")

ng_setup_workspace()

load("@angular_material//:index.bzl", "angular_material_setup_workspace")

angular_material_setup_workspace()
