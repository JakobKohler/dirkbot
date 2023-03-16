# How to build the Rust / WebAssembly code

## Install rust
Just follow the instructions [here](https://www.rust-lang.org/learn/get-started), no special version required.

## Install wasm-build
It's available as a rust crate and can be easily installed like this:
```shell
Cargo install wasm-build
```
Sometimes the `0.10.*` version causes some promplems, if so try this version:
```shell
Cargo install wasm-build --version 0.9.1
```
## Compile rust code to wasm
Yay you are ready compile the rust code now. Simply open a terminal in the `./rust-utils` directory and enter this command:
```shell
wasm-pack build --target nodejs
```
Congratulations your code should compile now!  
The compiled code can be found in the `pkg` directory.