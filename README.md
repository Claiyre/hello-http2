# hello-http2

Usage：

```Shell
npm install

npm start
```

注：证书相关文件并未上传，需要您自颁发，具体方法可参考：

```Shell
$ openssl genrsa -des3 -passout pass:x -out server.pass.key 2048
....
$ openssl rsa -passin pass:x -in server.pass.key -out server.key
writing RSA key
$ rm server.pass.key

$ openssl x509 -req -sha256 -days 365 -in server.csr -signkey server.key -out server.crt
....
$ openssl x509 -req -sha256 -days 365 -in server.csr -signkey server.key -out server.crt
```

将得到的三个文件拷贝到`ssl/`下即可