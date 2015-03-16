x = 65;
65.upto(65+25) do |number|
   
  puts "{\"ch\":\"#{number.chr}\", \"upper\":\"#{number.chr}\", \"lower\":\"#{(number+32).chr}\", \"pronouce\":\"wav/#{(number+32).chr}.mp3\"},"
end