import { ProfileResponseFromJson } from './profile';

describe('Profile', () => {
  it('問題なく型変換が出来ること', () => {
    const json = {
      user: {
        age: 20,
        ambassador: false,
        autoStrideEnabled: true,
        avatar:
          'https://static0.fitbit.com/images/profile/defaultProfile_100.png',
        avatar150:
          'https://static0.fitbit.com/images/profile/defaultProfile_150.png',
        avatar640:
          'https://static0.fitbit.com/images/profile/defaultProfile_640.png',
        averageDailySteps: 0,
        challengesBeta: true,
        clockTimeDisplayFormat: '24hour',
        corporate: false,
        corporateAdmin: false,
        dateOfBirth: '2004-01-01',
        displayName: 'First Last',
        displayNameSetting: 'name',
        distanceUnit: 'METRIC',
        encodedId: 'DUMMY',
        features: { exerciseGoal: true },
        firstName: 'First',
        fullName: 'First Last',
        gender: 'MALE',
        glucoseUnit: 'METRIC',
        height: 180,
        heightUnit: 'METRIC',
        isBugReportEnabled: false,
        isChild: false,
        isCoach: false,
        languageLocale: 'ja_JP',
        lastName: 'Last',
        legalTermsAcceptRequired: false,
        locale: 'ja_JP',
        memberSince: '2024-01-01',
        mfaEnabled: false,
        offsetFromUTCMillis: 32400000,
        sdkDeveloper: false,
        sleepTracking: 'Normal',
        startDayOfWeek: 'SUNDAY',
        strideLengthRunning: 111.30000000000001,
        strideLengthRunningType: 'auto',
        strideLengthWalking: 70.10000000000001,
        strideLengthWalkingType: 'auto',
        swimUnit: 'METRIC',
        temperatureUnit: 'METRIC',
        timezone: 'Asia/Tokyo',
        topBadges: [
          {
            badgeGradientEndColor: 'FF677C',
            badgeGradientStartColor: 'D24958',
            badgeType: 'DAILY_STEPS',
            category: 'Daily Steps',
            cheers: [],
            dateTime: '2024-10-20',
            description: '10,000 steps in a day',
            earnedMessage: 'Congrats on earning your first Sneakers badge!',
            encodedId: 'DUMMY',
            image100px:
              'https://www.gstatic.com/fitbit/badge/images/badges_new/100px/badge_daily_steps10k.png',
            image125px:
              'https://www.gstatic.com/fitbit/badge/images/badges_new/125px/badge_daily_steps10k.png',
            image300px:
              'https://www.gstatic.com/fitbit/badge/images/badges_new/300px/badge_daily_steps10k.png',
            image50px:
              'https://www.gstatic.com/fitbit/badge/images/badges_new/badge_daily_steps10k.png',
            image75px:
              'https://www.gstatic.com/fitbit/badge/images/badges_new/75px/badge_daily_steps10k.png',
            marketingDescription:
              "You've walked 10,000 steps  And earned the Sneaker badge!",
            mobileDescription:
              'You stepped up your game and just reached the recommended number of steps per day.',
            name: 'Sneakers (10,000 steps in a day)',
            shareImage640px:
              'https://www.gstatic.com/fitbit/badge/images/badges_new/386px/shareLocalized/en_US/badge_daily_steps10k.png',
            shareText:
              'I took 10,000 steps and earned the Sneakers badge! #Fitbit',
            shortDescription: '10,000 steps',
            shortName: 'Sneakers',
            timesAchieved: 4,
            value: 10000,
          },
          {
            badgeGradientEndColor: '38D7FF',
            badgeGradientStartColor: '2DB4D7',
            badgeType: 'LIFETIME_DISTANCE',
            category: 'Lifetime Distance',
            cheers: [],
            dateTime: '2024-07-27',
            description: '112 lifetime kilometers',
            earnedMessage: "Whoa! You've earned the Penguin March badge!",
            encodedId: 'DUMMY',
            image100px:
              'https://www.gstatic.com/fitbit/badge/images/badges_new/100px/badge_lifetime_miles70.png',
            image125px:
              'https://www.gstatic.com/fitbit/badge/images/badges_new/125px/badge_lifetime_miles70.png',
            image300px:
              'https://www.gstatic.com/fitbit/badge/images/badges_new/300px/badge_lifetime_miles70.png',
            image50px:
              'https://www.gstatic.com/fitbit/badge/images/badges_new/badge_lifetime_miles70.png',
            image75px:
              'https://www.gstatic.com/fitbit/badge/images/badges_new/75px/badge_lifetime_miles70.png',
            marketingDescription:
              "By reaching 112 lifetime kilometers, you've earned the Penguin March badge!",
            mobileDescription:
              'You matched the distance of the March of the Penguins—the annual trip emperor penguins make to their breeding grounds.',
            name: 'Penguin March (112 lifetime kilometers)',
            shareImage640px:
              'https://www.gstatic.com/fitbit/badge/images/badges_new/386px/shareLocalized/en_US/badge_lifetime_miles70_km.png',
            shareText:
              'I covered 112 kilometers with my #Fitbit and earned the Penguin March badge.',
            shortDescription: '112 kilometers',
            shortName: 'Penguin March',
            timesAchieved: 1,
            unit: 'KILOMETERS',
            value: 112,
          },
        ],
        visibleUser: true,
        weight: 60,
        weightUnit: 'METRIC',
      },
    };
    const profile = ProfileResponseFromJson(json);
    expect(profile.user.age).toBe(20);
    expect(profile.user.dateOfBirth).toBe('2004-01-01');
    expect(profile.user.displayName).toBe('First Last');
    expect(profile.user.encodedId).toBe('DUMMY');
    expect(profile.user.fullName).toBe('First Last');
    expect(profile.user.firstName).toBe('First');
    expect(profile.user.lastName).toBe('Last');
    expect(profile.user.gender).toBe('MALE');
    expect(profile.user.height).toBe(180);
    expect(profile.user.offsetFromUTCMillis).toBe(32400000);
  });
  it('undefinedが送られた来た場合、空で返却されること', () => {
    const someUndefinedJson = {
      user: {
        age: 20,
        ambassador: false,
        autoStrideEnabled: true,
        avatar:
          'https://static0.fitbit.com/images/profile/defaultProfile_100.png',
        avatar150:
          'https://static0.fitbit.com/images/profile/defaultProfile_150.png',
        avatar640:
          'https://static0.fitbit.com/images/profile/defaultProfile_640.png',
        averageDailySteps: 0,
        challengesBeta: true,
        clockTimeDisplayFormat: '24hour',
        corporate: false,
        corporateAdmin: false,
        dateOfBirth: '2004-01-01',
        displayName: 'First Last',
        displayNameSetting: 'name',
        distanceUnit: 'METRIC',
        encodedId: 'DUMMY',
        features: { exerciseGoal: true },
        firstName: undefined,
        fullName: 'First Last',
        gender: 'MALE',
        glucoseUnit: 'METRIC',
        height: 180,
        heightUnit: 'METRIC',
        isBugReportEnabled: false,
        isChild: false,
        isCoach: false,
        languageLocale: 'ja_JP',
        lastName: undefined,
        legalTermsAcceptRequired: false,
        locale: 'ja_JP',
        memberSince: '2024-01-01',
        mfaEnabled: false,
        offsetFromUTCMillis: 32400000,
        sdkDeveloper: false,
        sleepTracking: 'Normal',
        startDayOfWeek: 'SUNDAY',
        strideLengthRunning: 111.30000000000001,
        strideLengthRunningType: 'auto',
        strideLengthWalking: 70.10000000000001,
        strideLengthWalkingType: 'auto',
        swimUnit: 'METRIC',
        temperatureUnit: 'METRIC',
        timezone: 'Asia/Tokyo',
        topBadges: [
          {
            badgeGradientEndColor: 'FF677C',
            badgeGradientStartColor: 'D24958',
            badgeType: 'DAILY_STEPS',
            category: 'Daily Steps',
            cheers: [],
            dateTime: '2024-10-20',
            description: '10,000 steps in a day',
            earnedMessage: 'Congrats on earning your first Sneakers badge!',
            encodedId: 'DUMMY',
            image100px:
              'https://www.gstatic.com/fitbit/badge/images/badges_new/100px/badge_daily_steps10k.png',
            image125px:
              'https://www.gstatic.com/fitbit/badge/images/badges_new/125px/badge_daily_steps10k.png',
            image300px:
              'https://www.gstatic.com/fitbit/badge/images/badges_new/300px/badge_daily_steps10k.png',
            image50px:
              'https://www.gstatic.com/fitbit/badge/images/badges_new/badge_daily_steps10k.png',
            image75px:
              'https://www.gstatic.com/fitbit/badge/images/badges_new/75px/badge_daily_steps10k.png',
            marketingDescription:
              "You've walked 10,000 steps  And earned the Sneaker badge!",
            mobileDescription:
              'You stepped up your game and just reached the recommended number of steps per day.',
            name: 'Sneakers (10,000 steps in a day)',
            shareImage640px:
              'https://www.gstatic.com/fitbit/badge/images/badges_new/386px/shareLocalized/en_US/badge_daily_steps10k.png',
            shareText:
              'I took 10,000 steps and earned the Sneakers badge! #Fitbit',
            shortDescription: '10,000 steps',
            shortName: 'Sneakers',
            timesAchieved: 4,
            value: 10000,
          },
          {
            badgeGradientEndColor: '38D7FF',
            badgeGradientStartColor: '2DB4D7',
            badgeType: 'LIFETIME_DISTANCE',
            category: 'Lifetime Distance',
            cheers: [],
            dateTime: '2024-07-27',
            description: '112 lifetime kilometers',
            earnedMessage: "Whoa! You've earned the Penguin March badge!",
            encodedId: 'DUMMY',
            image100px:
              'https://www.gstatic.com/fitbit/badge/images/badges_new/100px/badge_lifetime_miles70.png',
            image125px:
              'https://www.gstatic.com/fitbit/badge/images/badges_new/125px/badge_lifetime_miles70.png',
            image300px:
              'https://www.gstatic.com/fitbit/badge/images/badges_new/300px/badge_lifetime_miles70.png',
            image50px:
              'https://www.gstatic.com/fitbit/badge/images/badges_new/badge_lifetime_miles70.png',
            image75px:
              'https://www.gstatic.com/fitbit/badge/images/badges_new/75px/badge_lifetime_miles70.png',
            marketingDescription:
              "By reaching 112 lifetime kilometers, you've earned the Penguin March badge!",
            mobileDescription:
              'You matched the distance of the March of the Penguins—the annual trip emperor penguins make to their breeding grounds.',
            name: 'Penguin March (112 lifetime kilometers)',
            shareImage640px:
              'https://www.gstatic.com/fitbit/badge/images/badges_new/386px/shareLocalized/en_US/badge_lifetime_miles70_km.png',
            shareText:
              'I covered 112 kilometers with my #Fitbit and earned the Penguin March badge.',
            shortDescription: '112 kilometers',
            shortName: 'Penguin March',
            timesAchieved: 1,
            unit: 'KILOMETERS',
            value: 112,
          },
        ],
        visibleUser: true,
        weight: 60,
        weightUnit: 'METRIC',
      },
    };
    const profile = ProfileResponseFromJson(someUndefinedJson);
    expect(profile.user.age).toBe(20);
    expect(profile.user.dateOfBirth).toBe('2004-01-01');
    expect(profile.user.displayName).toBe('First Last');
    expect(profile.user.encodedId).toBe('DUMMY');
    expect(profile.user.fullName).toBe('First Last');
    expect(profile.user.firstName).toBe('');
    expect(profile.user.lastName).toBe('');
    expect(profile.user.gender).toBe('MALE');
    expect(profile.user.height).toBe(180);
    expect(profile.user.offsetFromUTCMillis).toBe(32400000);
  });
});
