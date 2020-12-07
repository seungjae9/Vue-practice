from pytube import Playlist

print('재생목록 입력하삼')
playlist = Playlist('{}'.format(input()))
for index, video in enumerate(playlist.videos):
    print('{} 번째 동영상 다운로드중.....'.format(index+1))
    video.streams.first().download('video')
print('다운로드 완료')