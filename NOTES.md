## Publish
1.  **Проверить README и CHANGELOG**. Обратить вниание на дату релиза
2.  Создать коммит в мастер: `feat: release x.x.x`, `Update README.md`, ...
3.  **Создать релиз** `npm version x.x.x`
4.  **Последний раз все проверить**
5.  Логин `npm login`
6.  Выложить `npm publish`

## Перезапустить actions на гитхабе
```
git tag -d v1.0.0 && git push origin :refs/tags/v1.0.0 && git tag v1.0.0 && git push origin v1.0.0

git tag v1.0.0 && git push origin v1.0.0
```

## Тестирование
`npm pack --pack-destination test/test-package`


## generate.py 
1. Взял generate.py из pannellum@2.5.7
https://github.com/mpetroff/pannellum/blob/a5e2f25d960270b6cdd6136d2c18c21f745bba0e/utils/multires/generate.py

2. Внес правки по получению none
```py
def get_nona_path():
    import platform
    # Если мы внутри PyInstaller
    if hasattr(sys, '_MEIPASS'):
        name = 'nona.exe' if platform.system() == 'Windows' else 'nona'
        return os.path.join(sys._MEIPASS, name)
    # Если мы в режиме разработки
    return 'nona' # надеемся, что она в PATH   

...

# Find external programs
try:
    nona = get_nona_path()
    nona = find_executable('nona')
except KeyError:
    # Handle case of PATH not being set
    nona = None
```

3. Замени `Image.ANTIALIAS` на `Image.LANCZOS`

