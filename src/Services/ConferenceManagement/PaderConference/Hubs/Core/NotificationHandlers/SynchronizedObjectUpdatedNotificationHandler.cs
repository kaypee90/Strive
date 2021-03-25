﻿using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using JsonPatchGenerator;
using MediatR;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using PaderConference.Core.Services.Synchronization.Notifications;

namespace PaderConference.Hubs.Core.NotificationHandlers
{
    public class
        SynchronizedObjectUpdatedNotificationHandler : INotificationHandler<SynchronizedObjectUpdatedNotification>
    {
        private static readonly JsonSerializerSettings SyncObjPatchSettings = new()
        {
            ContractResolver = new CamelCasePropertyNamesContractResolver(),
            Converters = {new StringEnumConverter(new CamelCaseNamingStrategy())},
        };

        private readonly IHubContext<CoreHub> _hubContext;

        public SynchronizedObjectUpdatedNotificationHandler(IHubContext<CoreHub> hubContext)
        {
            _hubContext = hubContext;
        }

        public async Task Handle(SynchronizedObjectUpdatedNotification notification,
            CancellationToken cancellationToken)
        {
            var participantGroups = notification.Participants.Select(CoreHubGroups.OfParticipant);

            if (notification.PreviousValue == null)
            {
                var payload = new SyncObjPayload<object>(notification.SyncObjId, notification.Value);
                await _hubContext.Clients.Groups(participantGroups)
                    .OnSynchronizeObjectState(payload, cancellationToken);
            }
            else
            {
                var patch = JsonPatchFactory.Create(notification.PreviousValue, notification.Value,
                    SyncObjPatchSettings, JsonPatchFactory.DefaultOptions);

                var payload = new SyncObjPayload<JsonPatchDocument>(notification.SyncObjId, patch);

                await _hubContext.Clients.Groups(participantGroups)
                    .OnSynchronizedObjectUpdated(payload, cancellationToken);
            }
        }
    }
}
