import cloudinary
import cloudinary.uploader

cloudinary.config( 
  cloud_name = "dkim1kauf", 
  api_key = "116215273941236", 
  api_secret = "oisGqhGmvn7HmYWKTeEnKzqofuw" 
)

print("Uploading hero_video.mp4...")
res1 = cloudinary.uploader.upload_large("public/hero_video.mp4", resource_type="video", public_id="hero_video_opt")
print(f"hero_video URL: {res1['secure_url']}")

print("Uploading hero_video_mobile.mp4...")
res2 = cloudinary.uploader.upload("public/hero_video_mobile.mp4", resource_type="video", public_id="hero_video_mobile_opt")
print(f"hero_video_mobile URL: {res2['secure_url']}")
