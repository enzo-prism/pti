import { describe, expect, it } from "vitest";
import { PODCAST_INTERVIEW } from "./podcastInterview";

describe("BoomCloud / Navigating Dental Insurance interview", () => {
  it("uses the official Apple Podcasts episode and embed, not an invented URL", () => {
    expect(PODCAST_INTERVIEW.appleEpisodeUrl).toBe(
      "https://podcasts.apple.com/us/podcast/the-right-way-to-go-out-of-network/id1155876870?i=1000778110843",
    );
    expect(PODCAST_INTERVIEW.appleEmbedUrl).toBe(
      "https://embed.podcasts.apple.com/us/podcast/the-right-way-to-go-out-of-network/id1155876870?i=1000778110843",
    );
    expect(PODCAST_INTERVIEW.appleEmbedUrl).toContain("embed.podcasts.apple.com");
    expect(PODCAST_INTERVIEW.appleEpisodeUrl).toContain("i=1000778110843");
  });

  it("keeps Mike's guest line and names the hosts without advertising BoomCloud", () => {
    expect(PODCAST_INTERVIEW.quote).toContain(
      "A lot of fun to be a guest on The Navigating Dental Insurance Podcast with Ben Tuinei and Jordon Comstock.",
    );
    expect(PODCAST_INTERVIEW.quote).toContain(
      "Looking forward to doing a series with you. Stay tuned.",
    );
    expect(PODCAST_INTERVIEW.hosts).toEqual(["Ben Tuinei", "Jordon Comstock"]);
    expect(PODCAST_INTERVIEW.datePublished).toBe("2026-07-24");
    expect(PODCAST_INTERVIEW.boomCloudUrl).toBe("https://boomcloudapps.com");
  });
});
